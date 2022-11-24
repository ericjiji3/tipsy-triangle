import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

const Triangle = () => {
  const loadTri = useLoader(GLTFLoader, '/triangle.glb');
  let triangle;
  loadTri.scene.traverse(child => {
    if(child.name == 'Cylinder'){
      triangle = child;
      triangle.material = new THREE.MeshNormalMaterial();
      triangle.position.y = -0.15;
    }
  })

  for(let i = 0; i < 20; i++){
    const t = triangle.scene.clone();
    console.log(t);
    return(
      <Suspense fallback={null}>
        <primitive object={t}/>
      </Suspense>
    )
  }
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Canvas camera={{fov: 75, position: [0, 0, 3]}} style={{height: '100vh', width: '100%', backgroundColor: '#000000'}}>
    <Triangle/>
  </Canvas>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
