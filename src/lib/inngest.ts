import { EventSchemas, Inngest } from "inngest";
import z from "zod";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "uplevl",
  schemas: new EventSchemas().fromZod({
    "posts/create": {
      data: z.object({
        userId: z.string(),
        imageUrl: z.string(),
        description: z.string().optional(),
      }),
    },
  }),
});
