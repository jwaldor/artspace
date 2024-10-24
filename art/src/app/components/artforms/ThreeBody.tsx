"use client";


import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { CoordinatesType } from "@/app/lib/renderengines";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { threeBodyEngine } from "@/app/lib/renderengines";


export function ThreeBodyMesh() {
    const [coordinates, setCoordinates] = useState<CoordinatesType>([{ position: [0, 0, 5], velocity: [0, 0, 0] }, { position: [0, 5, 0], velocity: [0, 0, 0] }, { position: [0, -5, 0], velocity: [0, 0, 0] }]);
    useEffect(() => {
        function updateCoordinates() {
            setCoordinates(coordinates => threeBodyEngine(coordinates));
            setInterval(updateCoordinates, 1000);
        }
        updateCoordinates();
    }, []);
    return (
        <>
            <mesh position={coordinates[0].position}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <mesh position={coordinates[1].position}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            <mesh position={coordinates[2].position}>
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



