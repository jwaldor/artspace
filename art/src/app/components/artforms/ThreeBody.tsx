"use client";


import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { CoordinatesType } from "@/app/lib/renderengines";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'



export function ThreeBodyMesh() {
    const [coordinates, setCoordinates] = useState<CoordinatesType>([{ position: [0, 0, 5], velocity: [0, 0, 0] }, { position: [0, 5, 0], velocity: [0, 0, 0] }, { position: [0, -5, 0], velocity: [0, 0, 0] }]);
    return (
        <>
            <mesh position={[0, 0, 5]}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <mesh position={[0, 5, 0]}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <mesh position={[0, -5, 0]}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </>
    );
}

export function ThreeBody() {
    return (
        <Canvas style={{ height: '48rem', width: '100%' }}>
            <ThreeBodyMesh />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <directionalLight position={[5, 5, 5]} intensity={1} />
        </Canvas>
    );
}



