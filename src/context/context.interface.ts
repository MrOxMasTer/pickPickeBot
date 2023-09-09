import { Context } from "telegraf";

export interface SessionData {
  courseLike: boolean;
}

type BaseBotContext = Context;

export interface IBotContext extends BaseBotContext {
  session: SessionData;
}

// export type BaseBotContext = SessionContext<SceneSession<IBotContext>> & {
//   scene: SceneContextScene<
//     SessionContext<SceneSession<IBotContext>>,
//     IBotContext
//   >;
// } & Context;

// export type TBaseBotContext = IBotContext & {
//   scene: SceneContextScene<
//     SessionContext<SceneSession<IBotContext>>,
//     IBotContext
//   >;
// };

// export interface IBotContextScene extends
