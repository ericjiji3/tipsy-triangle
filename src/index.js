import React, { useState, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';


const Triangle = ({count}) => {
  const loadTri = useLoader(GLTFLoader, '/triangle.glb');
  const [clones, setClones] = useState();

  let triangle;
  loadTri.scene.traverse(child => {
    if(child.name == 'Cylinder'){
      triangle = child;
      triangle.material = new THREE.MeshNormalMaterial();
    }
  })

  // const updatePosition = (tris) => {
  //   foreach(tri in tris){

  //   }
  // }

  useEffect(() => {
    const tempTri = [];
    for(let i=0; i<count; i++){
      let triType = {
        scale: i
      }
      console.log(triType); 
      tempTri.push(triType);
    }
    // updatePosition(tempTri);
    console.log(tempTri);
    setClones(tempTri);
  }, [count])
  // const group = [];
  // for(let i = 0; i < 20; i++){
  //   const t = triangle.clone();
  //   console.log(t);
  //   group.push()
  //   return(
  //     <Suspense fallback={null}>
        
  //     </Suspense>
  //   )
  // }
  return(
    <group>
        {clones?.map((clone, index) => {
          return(
            <object3D key={index} scale={clone.scale} position={[0, 0, 0]}>
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
  <Canvas camera={{fov: 75, position: [0, 2, 10]}} style={{height: '100vh', width: '100%', backgroundColor: '#000000'}}>
    <Triangle count={5}/>
  </Canvas>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
