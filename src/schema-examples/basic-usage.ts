import { ZodError, z } from "zod";
import * as S from "@effect/schema/Schema";
import * as Either from "effect/Either";

// creating a schema for strings
const mySchema = z.string();
const myOtherSchema = S.string;

// parsing zod
console.log(mySchema.parse("tuna"));
try {
  console.log(mySchema.parse(12));
} catch (err) {
  if (err instanceof ZodError) console.log(err.errors);
}

console.log(mySchema.safeParse("tuna"));
console.log(mySchema.safeParse(12));

// parsing Effect.Schema
console.log(S.parseSync(myOtherSchema)("tuna"));

const t1 = S.parseEither(myOtherSchema)("tuna");
console.log(Either.isRight(t1) ? t1.right : t1.left);

const t2 = S.parseEither(myOtherSchema)(12);
console.log(Either.isRight(t2) ? t2.right : t2.left);

console.log("#############");

const zUserschema = z.object({
  username: z.string(),
});
const sUserSchema = S.struct({
  username: S.string,
});

// parse zod object
console.log(zUserschema.parse({ username: "Ludwig" }));
try {
  console.log(zUserschema.parse({ lastname: "Ludwig" }));
} catch (err) {
  if (err instanceof ZodError) console.log(err.errors);
}

// parse Schema struct
console.log(S.parseSync(sUserSchema)({ username: "Ludwig" }));
try {
  console.log(S.parseSync(sUserSchema)({ username: "Ludwig" }));
} catch (err) {
  if (err instanceof Error) console.log(err.message);
}

const t11 = S.parseEither(sUserSchema)({ username: "Ludwig" });
console.log(Either.isRight(t11) ? t11.right : t11.left);

const t21 = S.parseEither(sUserSchema)({ username: 12 });
console.log(Either.isRight(t21) ? t21.right : t21.left);

const t22 = S.parseEither(sUserSchema)({ lastname: "Ludwig" });
console.log(Either.isRight(t22) ? t22.right : t22.left);
