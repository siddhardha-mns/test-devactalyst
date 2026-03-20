declare module 'animejs' {
  interface AnimeParams {
    targets?: string | Element | Element[] | NodeList | null;
    duration?: number;
    delay?: number | ((_el: Element, _i: number) => number);
    easing?: string;
    loop?: boolean | number;
    direction?: 'normal' | 'reverse' | 'alternate';
    autoplay?: boolean;
    complete?: (_anim: AnimeInstance) => void;
    [prop: string]: unknown;
  }

  interface AnimeInstance {
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
    seek: (_time: number) => void;
    add: (_params: AnimeParams, _offset?: number | string) => AnimeInstance;
  }

  interface AnimeStatic {
    (_params: AnimeParams): AnimeInstance;
    timeline(_params?: AnimeParams): AnimeInstance;
    stagger(_value: number | string, _options?: object): (_el: Element, _i: number) => number;
    set(_targets: AnimeParams['targets'], _values: object): void;
    remove(_targets: AnimeParams['targets']): void;
    get(_targets: AnimeParams['targets'], _prop: string): string | number;
    running: AnimeInstance[];
    speed: number;
  }

  const anime: AnimeStatic;
  export default anime;
}
