// components/BabylonScene.js
import React, { useEffect, useRef } from 'react'
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
} from '@babylonjs/core'
import '@babylonjs/loaders'
import { drawScene } from './SceneMaster'

const BabylonScene = (props) => {
  const canvas = useRef(null)
  const engine = useRef(null)
  const scene = useRef(null)

  useEffect(() => {
    if (!canvas.current) return

    engine.current = new Engine(canvas.current, true, props.engineOptions)
    scene.current = new Scene(engine.current)

    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      30,
      new Vector3(0, 0, 0),
      scene.current
    )
    camera.attachControl(canvas.current, true)
    camera.setTarget(Vector3.Zero()),
    camera.attachControl(canvas.current, true)

    if (props.onSceneReady) {
      props.onSceneReady(scene.current)
    } else {
      drawScene(scene, canvas.current)
    }

    engine.current.runRenderLoop(() => {
      if (scene.current) {
        scene.current.render()
      }
    })

    const resize = () => {
      engine.current.resize()
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (engine.current) {
        engine.current.dispose()
      }
    }
  }, [props.onSceneReady, props.engineOptions]) // Add props as dependencies to re-run effect if they change

  return (
    <canvas
      ref={canvas}
      {...props.canvasOptions}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

export default BabylonScene
