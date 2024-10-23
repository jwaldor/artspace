"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Mesh } from "three";
import { ShibaParameters } from "@/services/artService";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'





console.log("ShibaMesh preload");
const SHIBA_MESH_URL = "/shiba/scene.gltf";

// const NISSAN_MESH_URL = "/1978-nissan-skyline/1978 Nissan Skyline.zip";


// Pre-load the model
// useGLTF.preload(SHIBA_MESH_URL);
// useGLTF.preload(NISSAN_MESH_URL);

export function ShibaMesh() {
    const mesh = useRef<Mesh>(null!);
    const { scene } = useGLTF(SHIBA_MESH_URL);
    // const { scene: nissan } = useGLTF(NISSAN_MESH_URL);
    // useFrame(() => {
    //     mesh.current.rotation.y += 0.01;
    // });

    return (
        <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
            <primitive object={scene} />
            {/* <primitive object={nissan} /> */}
        </mesh>
    );
}

export function Shiba(props: ShibaParameters) {
    console.log("Shiba", props);
    return (
        <Canvas style={{ height: '100%', width: '100%' }}>
            <ShibaMesh />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <fog attach="fog" args={['#f0f0f0', 0, props.fog]} />
        </Canvas>
    );
}



