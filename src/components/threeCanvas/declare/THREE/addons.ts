export abstract class addonsBasic {
  public Geometry?: THREE.Object3D
  /** 渲染更新函数 */
  public update?: () => void
  /** 模型改变触发函数 */
  public ChangeModel?: (...args: any) => void
}
