import { Markup, Scenes } from "telegraf";
import { IBotContext } from "../context/context.interface";

const startScene = new Scenes.BaseScene<IBotContext>("start");

startScene.enter((ctx) => {
    return ctx.sendMessage(
        `Что предпочитаете сделать?`,
        Markup.keyboard([
            "📃 Посмотреть список задач",
            "📝 Добавить задачу",
        ]).resize()
    );
});

startScene.hears("📃 Посмотреть список задач", (ctx) => {
    return ctx.scene.enter("viewTodoList");
});

startScene.hears("📝 Добавить задачу", (ctx) => {
    return ctx.scene.enter("addTodo");
});

// startScene.on(message("text"), (ctx) => {
//     ctx.sendMessage(
//         `
//         Список команд:
//             /start - запуск / перезапуск бота
//             /viewlist - посмотреть список дел
//             /addtodo - добавить задачу
//             /marktodo - отметить задачу
//             /deletetodo - удалить задачу
//     `
//     );
// });

export { startScene };
