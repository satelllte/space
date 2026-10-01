import {Component} from 'react';
import {SceneError} from '../../../../ui/layout/SceneError';

type CanvasErrorBoundaryProps = {
  children: React.ReactNode;
};

type CanvasErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Prevents the whole page from unmounting when the scene cannot be rendered (e.g. WebGL is not available)
 */
export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  override state: CanvasErrorBoundaryState = {hasError: false};

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return {hasError: true};
  }

  override render() {
    if (this.state.hasError) {
      return (
        <SceneError message='Cannot display the scene in this browser :(' />
      );
    }

    return this.props.children;
  }
}
