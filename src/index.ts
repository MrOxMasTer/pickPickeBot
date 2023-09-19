import process from "process";
import { Scenes, Telegraf, session } from "telegraf";
import { useNewReplies } from "telegraf/future";
import { AddTodoCommand } from "./commands/addTodo.command";
import { Command } from "./commands/command.class";
import { DeleteTodoCommand } from "./commands/deleteTodo.command";
import { MarkTodoCommand } from "./commands/markTodo.command";
import { StartCommand } from "./commands/start.command";
import { StopCommand } from "./commands/stop.command";
import { ViewListCommand } from "./commands/viewList.command";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { addTodoScene } from "./scenes/addTodo";
import { deleteTodoScene } from "./scenes/deleteTodo";
import { markTodoScene } from "./scenes/markTodo";
import { startScene } from "./scenes/start";
import { viewTodoListScene } from "./scenes/viewTodoList";

class Bot {
    bot: Telegraf<IBotContext>;
    scenes: Scenes.Stage<IBotContext, Scenes.SceneSessionData>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(`${process.env.TOKEN}`);
        this.scenes = new Scenes.Stage<IBotContext>([
            startScene,
            addTodoScene,
            viewTodoListScene,
            markTodoScene,
            deleteTodoScene,
        ]);

        this.bot.use(session());
        this.bot.use(this.scenes.middleware());
        this.bot.use(useNewReplies());
    }

    init() {
        this.commands = [
            new StartCommand(this.bot),
            new StopCommand(this.bot),
            new ViewListCommand(this.bot),
            new AddTodoCommand(this.bot),
            new DeleteTodoCommand(this.bot),
            new MarkTodoCommand(this.bot),
        ];
        for (const command of this.commands) {
            command.handle();
        }

        this.bot.launch();

        process.once("SIGINT", () => this.bot.stop("SIGINT"));
        process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
    }
}

const bot = new Bot(new ConfigService());

bot.init();

// `
// start - запуск / перезапуск бота
// viewlist - посмотреть список дел
// addtodo - добавить задачу
// marktodo - отметить задачу
// deletetodo - удалить задачу
// `;
