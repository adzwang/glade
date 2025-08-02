import React from "react";

export const meta = {
  name: "Hello, World!",
  desc: "A sample widget",
  endpoint: "helloworld",
  refresh: 60
} as const;

export const Component: React.FC = () => (
  <p className="text-center">I render!</p>
)