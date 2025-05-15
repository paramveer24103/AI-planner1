declare module 'react-native-reanimated' {
  import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
  
  export type AnimatedStyle<T> = T extends ViewStyle
    ? ViewStyle
    : T extends TextStyle
    ? TextStyle
    : T extends ImageStyle
    ? ImageStyle
    : never;

  export function useSharedValue<T>(initialValue: T): { value: T };
  
  export function useAnimatedStyle<T extends ViewStyle | TextStyle | ImageStyle>(
    updater: () => T,
    dependencies?: ReadonlyArray<unknown>
  ): T;
  
  export function withTiming<T>(
    toValue: T,
    config?: { duration?: number; easing?: any }
  ): T;
  
  export function withDelay<T>(
    delayMS: number,
    delayedAnimation: T
  ): T;
  
  export const Easing: {
    out: (easing: any) => any;
    back: () => any;
    cubic: any;
  };
  
  export namespace Animated {
    export class View extends React.Component<any> {}
  }
}
