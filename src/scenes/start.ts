import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../context/context.interface";

const startScene = new Scenes.BaseScene<IBotContext>("start");

startScene.enter((ctx) => {
    // try {
    //     await prisma.
    // } catch (e) {}

    return ctx.sendMessage(
        `Что предпочитаете сделать?`,
        Markup.keyboard([
            "📃 Посмотреть список задач",
            "📝 Добавить задачу",
        ]).resize()
    );
});

startScene.hears("📃 Посмотреть список задач", (ctx) => {
    ctx.scene.enter("viewTodoList");
});

startScene.hears("📝 Добавить задачу", (ctx) => {
    ctx.scene.enter("addTodo");
});

export { startScene };
