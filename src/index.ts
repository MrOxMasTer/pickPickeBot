import { Scenes, Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { useNewReplies } from "telegraf/future";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { StopCommand } from "./commands/stop.command";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { ExtSession, IBotContext } from "./context/context.interface";
import { addTodoScene } from "./scenes/addTodo";
import { startScene } from "./scenes/start";

class Bot {
    bot: Telegraf<IBotContext>;
    localSession: LocalSession<ExtSession>;
    scenes: Scenes.Stage<IBotContext, Scenes.SceneSessionData>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
        this.localSession = new LocalSession<ExtSession>({
            database: "sessions.json",
        });
        this.scenes = new Scenes.Stage<IBotContext>([startScene, addTodoScene]);

        this.bot.use(this.localSession.middleware());
        this.bot.use(this.scenes.middleware());
        this.bot.use(useNewReplies());
    }

    init() {
        this.commands = [new StartCommand(this.bot), new StopCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }

        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());

bot.init();
