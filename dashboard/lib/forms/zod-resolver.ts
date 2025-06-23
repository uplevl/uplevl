import { toNestErrors, validateFieldsNatively } from "@hookform/resolvers";
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Resolver,
  type ResolverError,
  type ResolverSuccess,
  appendErrors,
} from "react-hook-form";
import { ZodError, type z } from "zod/v4";

// Define interface for union issues with more precise typing
type ZodErrorWithUnionIssues = z.core.$ZodIssue & {
  unionIssues: ZodError[];
  code: "invalid_union";
};

/**
 * Type guard to check if an error is a ZodError
 */
function isZodError(error: unknown): error is ZodError {
  return (
    error instanceof ZodError ||
    (typeof error === "object" &&
      error !== null &&
      "issues" in error &&
      Array.isArray((error as { issues: unknown }).issues))
  );
}

/**
 * Type guard to check if a ZodIssue contains union issues
 */
function isUnionIssue(issue: z.core.$ZodIssue): issue is ZodErrorWithUnionIssues {
  return (
    issue.code === "invalid_union" &&
    "unionIssues" in issue &&
    Array.isArray((issue as ZodErrorWithUnionIssues).unionIssues)
  );
}

function parseErrorSchema(
  zodIssues: z.core.$ZodIssue[],
  validateAllFieldCriteria: boolean,
): Record<string, FieldError> {
  const errors: Record<string, FieldError> = {};
  const issueQueue = [...zodIssues]; // Create a copy to avoid mutating the original array

  while (issueQueue.length > 0) {
    const issue = issueQueue.shift()!;
    const { code, message, path } = issue;
    const _path = path.join(".");

    // Handle the error for this path if it doesn't exist yet
    if (!errors[_path]) {
      if (isUnionIssue(issue) && issue.unionIssues.length > 0) {
        // For union errors, collect all messages from the first level of union issues
        // This provides more context than just using the first issue
        const unionMessages: string[] = [];
        let unionType = code;
        // Look for the most specific error in the union issues
        for (const unionError of issue.unionIssues) {
          if (unionError && Array.isArray(unionError.issues) && unionError.issues.length > 0) {
            // Get the first issue from each union branch
            const firstIssue = unionError.issues[0];
            unionMessages.push(firstIssue.message);

            // Prefer more specific error codes over generic ones
            if (unionType === "invalid_union" && firstIssue.code !== "invalid_union") {
              unionType = firstIssue.code;
            }
          }
        }

        // Use the combined message or fall back to the original message
        const combinedMessage = unionMessages.length > 0 ? unionMessages.join(" | ") : message;

        errors[_path] = {
          message: combinedMessage,
          type: unionType,
        };
      } else {
        errors[_path] = { message, type: code };
      }
    }

    // Process all nested union issues by adding them to the queue
    if (isUnionIssue(issue)) {
      for (const unionError of issue.unionIssues) {
        if (unionError && Array.isArray(unionError.issues)) {
          // Add all issues from this union branch to be processed
          issueQueue.push(...unionError.issues);
        }
      }
    }

    // Handle the validateAllFieldCriteria case to collect all errors
    if (validateAllFieldCriteria) {
      const existingError = errors[_path];
      const types = existingError.types || {};
      const existingMessages = types[code] as string | string[] | undefined;

      errors[_path] = appendErrors(
        _path,
        validateAllFieldCriteria,
        errors,
        code,
        existingMessages ? ([] as string[]).concat(existingMessages, message) : message,
      ) as FieldError;
    }
  }

  return errors;
}

export function zodResolver<
  TSchema extends z.ZodType<FieldValues, unknown>,
  TFieldValues extends FieldValues = z.infer<TSchema>,
  TContext = unknown,
>(
  schema: TSchema,
  schemaOptions?: Parameters<TSchema["parseAsync"]>[1],
  resolverOptions?: {
    mode?: "async" | "sync";
    raw?: false;
  },
): Resolver<TFieldValues, TContext, z.infer<TSchema>>;

export function zodResolver<
  TSchema extends z.ZodType<FieldValues, unknown>,
  TFieldValues extends FieldValues = z.infer<TSchema>,
  TContext = unknown,
>(
  schema: TSchema,
  schemaOptions?: Parameters<TSchema["parseAsync"]>[1],
  resolverOptions?: {
    mode?: "async" | "sync";
    raw: true;
  },
): Resolver<TFieldValues, TContext, TFieldValues>;

/**
 * Creates a resolver function for react-hook-form that validates form data using a Zod schema
 * @param {ZodType<Output, Input>} schema - The Zod schema used to validate the form data
 * @param {Object} [schemaOptions] - Optional configuration options for Zod parsing
 * @param {Object} [resolverOptions] - Optional resolver-specific configuration
 * @param {('async'|'sync')} [resolverOptions.mode='async'] - Validation mode. Use 'sync' for synchronous validation
 * @param {boolean} [resolverOptions.raw=false] - If true, returns the raw form values instead of the parsed data
 * @returns {Resolver} A resolver function compatible with react-hook-form
 * @throws {Error} Throws if validation fails with a non-Zod error
 * @example
 * const schema = z.object({
 *   name: z.string().min(2),
 *   age: z.number().min(18)
 * });
 *
 * useForm({
 *   resolver: zodResolver(schema)
 * });
 */
export function zodResolver<
  TSchema extends z.ZodType<FieldValues, unknown>,
  TFieldValues extends FieldValues = z.infer<TSchema>,
  TContext = unknown,
>(
  schema: TSchema,
  schemaOptions?: Parameters<TSchema["parseAsync"]>[1],
  resolverOptions: {
    mode?: "async" | "sync";
    raw?: boolean;
  } = {},
): Resolver<TFieldValues, TContext, z.infer<TSchema> | TFieldValues> {
  return async (values, _, options) => {
    try {
      const data = await schema[resolverOptions.mode === "sync" ? "parse" : "parseAsync"](values, schemaOptions);

      if (options.shouldUseNativeValidation) {
        validateFieldsNatively({}, options);
      }

      return {
        errors: {} as FieldErrors,
        values: resolverOptions.raw ? Object.assign({}, values) : data,
      } as ResolverSuccess<z.infer<TSchema> | TFieldValues>;
    } catch (error) {
      if (isZodError(error)) {
        return {
          values: {},
          errors: toNestErrors(
            parseErrorSchema(error.issues, !options.shouldUseNativeValidation && options.criteriaMode === "all"),
            options,
          ) as FieldErrors<TFieldValues>,
        } as ResolverError<TFieldValues>;
      }

      throw error;
    }
  };
}
