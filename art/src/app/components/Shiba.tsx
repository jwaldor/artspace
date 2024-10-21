"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Mesh } from "three";
import { ShibaParameters } from "@/services/artService";

const SHIBA_MESH_URL = "/shiba/scene.gltf";

export function ShibaMesh() {
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, SHIBA_MESH_URL);
    useFrame(() => {
        mesh.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={mesh}>
            <primitive object={gltf.scene} />
        </mesh>
    );
}

export function Shiba(props: ShibaParameters) {
    console.log("Shiba");
    return <Canvas>
        <ShibaMesh />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <fog attach="fog" args={['#f0f0f0', 0, props.fog]} />
    </Canvas>
}

