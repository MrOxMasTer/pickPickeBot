// import { DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    // private config: DotenvParseOutput;

    constructor() {
        // const { parsed, error } = config();
        // if (error) {
        //     throw new Error("Не найден файл .env");
        // }
        // if (!parsed) {
        //     throw new Error("Пустой файл .env");
        // }
        // this.config = parsed;
    }

    public get(key: string): string {
        // const res = this.config[key];
        // if (!res) {
        //     throw new Error("Нет такого ключа");
        // }
        return key;
        // return res;
    }
}
