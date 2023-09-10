import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../context/context.interface";

const startScene = new Scenes.BaseScene<IBotContext>("start");

startScene.enter((ctx) => {
    ctx.reply(
        `Добро пожаловать в ваш список дел, ${ctx.from?.first_name}`,
        Markup.keyboard(["📃 Посмотреть список задач", "📝 Добавить задачу"])
    );
});

startScene.hears("📃 Посмотреть список задач", async (ctx) => {
    await ctx.reply("список: ");
    ctx.session.todoList.forEach(({ value, isDone }) =>
        ctx.reply(`${value} ${isDone ? "✅" : ""}`)
    );
});

startScene.hears("📝 Добавить задачу", (ctx) => {
    ctx.scene.enter("addTodo");
});

export { startScene };
