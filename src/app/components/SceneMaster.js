import {
  FreeCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
} from '@babylonjs/core'

export const drawScene = (scene, canvas) => {
  const camera = new FreeCamera(
    'camera1',
    new Vector3(0, 0, -10),
    scene.current
  )
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas.current, true)

  const light = new HemisphericLight(
    'light1',
    new Vector3(0, 1, 0),
    scene.current
  )
  light.intensity = 0.7

  const sphere = MeshBuilder.CreateSphere(
    'sphere1',
    { diameter: 2, segments: 32 },
    scene.current
  )
}
