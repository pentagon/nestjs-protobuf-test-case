// @generated by protoc-gen-es v1.2.0 with parameter "target=ts"
// @generated from file protos/auth/response/sign_in.proto (package protos.auth.response, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message protos.auth.response.SignIn
 */
export class SignIn extends Message<SignIn> {
  /**
   * @generated from field: string auth_token = 1;
   */
  authToken = "";

  constructor(data?: PartialMessage<SignIn>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "protos.auth.response.SignIn";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "auth_token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignIn {
    return new SignIn().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignIn {
    return new SignIn().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignIn {
    return new SignIn().fromJsonString(jsonString, options);
  }

  static equals(a: SignIn | PlainMessage<SignIn> | undefined, b: SignIn | PlainMessage<SignIn> | undefined): boolean {
    return proto3.util.equals(SignIn, a, b);
  }
}
