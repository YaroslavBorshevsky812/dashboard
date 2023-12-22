/** Ширина экрана, до превышения которой, приложение выводится в мобильном виде. */
const SCREEN_WIDTH_MOBILE = 680;

/** Отображать приложение в мобильном виде. */
export const isMobileView = (): boolean => Boolean(document.documentElement.clientWidth < SCREEN_WIDTH_MOBILE);