import { UploadType } from "./upload-type";

export class Upload {
  fileName: string;
  extension: string;
  uploadType: UploadType;
  data: string | ArrayBuffer;
}
