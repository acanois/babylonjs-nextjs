import {
  FreeCamera,
  HemisphericLight,
  Vector3,
  Texture,
  ParticleSystem,
  Mesh,
  MeshBuilder,
  Color4,
  NoiseProceduralTexture,
} from '@babylonjs/core'

export const drawScene = (scene, canvas) => {
  const light = new HemisphericLight(
    'light1',
    new Vector3(0, 1, 0),
    scene.current
  )
  light.intensity = 0.7

  const particleSystem = new ParticleSystem('particles', 100, scene.current)
  particleSystem.particleTexture = new Texture('Flare.png', scene.current)
  particleSystem.emitter = new Vector3(0, 0, 0) // Use a mesh to transform the entire system
  particleSystem.textureMask = new Color4(1.0, 1.0, 1.0, 1.0)
  particleSystem.disposeOnStop = true

  const noiseTexture = new NoiseProceduralTexture('perlin', 256, scene.current)
  noiseTexture.animationSpeedFactor = 1
  noiseTexture.persistence = 2
  noiseTexture.brightness = 0.5
  noiseTexture.octaves = 2

  particleSystem.noiseTexture = noiseTexture
  particleSystem.noiseStrength = new Vector3(3, 0, 3)

  particleSystem.start()
}
