import React, { useState, Suspense, useEffect, useRef, createRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';


const Triangle = ({count}) => {
  const animate = useRef([]);
  
  const loadTri = useLoader(GLTFLoader, '/triangle.glb');
  const [clones, setClones] = useState();
  console.log(animate.current)
  let triangle;

  loadTri.scene.traverse(child => {
    if(child.name == 'Cylinder'){
      triangle = child;
      triangle.material = new THREE.MeshNormalMaterial();
    }
  })
  
  useEffect(() => {
    const tempTri = [];
    for(let i=0; i<count; i++){
      let triType = {
        scale: i/2
      }

      tempTri.push(triType);
    }

    setClones(tempTri);
    
  }, [count])

  useFrame((state, delta) => (
      animate.current.map((ani, i) => {
        ani.rotation.x += 0.005 + i*0.0001
        // if(i%2 == 0){
        //   ani.rotation.y -= 0.005
        // }else{
        //   ani.rotation.y += 0.005
        // }
        
      })
    )
  )

  return(
    <group >
        {clones?.map((clone, index) => {
          return(
            <object3D ref={el => animate.current[index] = el} key={index} scale={clone.scale} position={[0, 0, 0]}>
              <primitive object={triangle.clone()}/>
            </object3D>
          )
        })
        }
    </group>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Canvas camera={{fov: 75, position: [0, 2, 9]}} style={{height: '100vh', width: '100%', backgroundColor: '#000000'}}>
    <Triangle count={15}/>
  </Canvas>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
