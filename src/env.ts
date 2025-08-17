import "dotenv/config";

const required = ["DATABASE_URL", "JWT_SECRET", "PORT"] as const;

for (const k of required) {
  if (!process.env[k]) throw new Error(`Missing env var: ${k}`);
}

export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV ?? "development",
} as const;
