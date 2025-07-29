"use client";

import { Body, Head, Html, Img, Text } from "@react-email/components";

import { env } from "@/lib/env/client";

interface EmailTemplateProps {
  children: React.ReactNode;
}

export function PersonalEmailTemplate({ children }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Text style={paragraphStyles}>
          {children}
          <br />
          Florian
          <br />
          <b>Founder & CEO</b>
        </Text>
        <Img src={`${env.NEXT_PUBLIC_URL}/email-logo.png`} alt="Uplevl" width="80" height="26" style={logo} />
        <Text style={paragraphStyles}>
          <a href="https://uplevl.ai" style={linkStyles}>
            uplevl.ai
          </a>
        </Text>
      </Body>
    </Html>
  );
}

export const paragraphStyles = {
  color: "#000000",
  fontFamily: "sans-serif",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 12px 0",
  padding: "0",
};

const logo = {
  marginBottom: "4px",
};

export const linkStyles = {
  textDecoration: "underline",
};
