"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { ShibaParameters } from "@/services/artService";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'




export function ThreeBodyMesh() {

    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
            <primitive object={scene} />
            {/* <primitive object={nissan} /> */}
        </mesh>
    );
}

export function ThreeBody() {
    console.log("Shiba", props);
    return (
        <Canvas style={{ height: '100%', width: '100%' }}>
            <ThreeBodyMesh />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <fog attach="fog" args={['#f0f0f0', 0, props.fog]} />
        </Canvas>
    );
}



