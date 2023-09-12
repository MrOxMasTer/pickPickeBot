import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../context/context.interface";

const startScene = new Scenes.BaseScene<IBotContext>("start");

startScene.enter((ctx) => {
    return ctx.sendMessage(
        `Что предпочетаете сделать?`,
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
