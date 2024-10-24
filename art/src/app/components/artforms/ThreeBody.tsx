"use client";


import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { CoordinatesType } from "@/app/lib/renderengines";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { threeBodyEngine } from "@/app/lib/renderengines";


export function ThreeBodyMesh() {
    const [coordinates, setCoordinates] = useState<CoordinatesType>([{ position: [0, 0, 10], velocity: [0, 0, 0] }, { position: [10, 0, -2], velocity: [0, 0, 0] }, { position: [0, -10, 6], velocity: [0, 0, 0] }]);
    const effectRan = useRef(false);
    useEffect(() => {
        if (effectRan.current) return;
        function updateCoordinates() {
            setCoordinates(coordinates => threeBodyEngine(coordinates));
            console.log("updating coordinates");
            setTimeout(updateCoordinates, 50);
        }
        updateCoordinates();
        effectRan.current = true;
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



