import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getNewsData() {
    return "All Data";
  }
}
