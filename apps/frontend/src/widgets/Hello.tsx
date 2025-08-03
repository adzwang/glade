import React from "react";

export const meta = {
  name: "Hello, World!",
  desc: "A sample widget",
  endpoint: "helloworld",
  refresh: 60,
  fullBleed: false,
} as const;

export const Component: React.FC = () => (
  <p className="text-center">I'm a sample widget to demonstrate how extensible this system is!</p>
)