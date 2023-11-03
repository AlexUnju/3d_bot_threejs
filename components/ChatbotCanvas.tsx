"use client";
import { OrbitControls, SpotLight, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three';

const Torch = ({vec = new Vector3(), ...props}) => {
    const light = useRef<THREE.SpotLight>(null);
    useFrame((state) => {
        light.current?.target.position.lerp(vec.set(state.mouse.x, state.mouse.y,0),
        0.1);
    });

    return <SpotLight ref={light}
    castShadow
    penumbra={1}
    distance={10}
    angle={0.35}
    attenuation={5}
    anglePower={4}
    intensity={3}
    {...props}
    />

}

const Head = () => {
    const model = useGLTF('/head.glb')
    const animation = useAnimations(model.animations, model.scene)
    const action = animation.actions.Animation;
    useEffect(() => {
    //  action?.play();
    //  action?.stop();

    }, [action]);
    return (
        <>
        <primitive object={model.scene} scale={7} rotation-x={-0.20} rotation-y={3.1} rotation-z={6.3} />
        <Torch color="blue" position={[3,2,2]}/>
        <Torch color="blue" position={[-3,2,2]}/>

    </>
    )
}

export const ChatbotCanvas = () => {
    return (
        <Canvas style={{ height: 'calc(100vh - 100px)' }}>
            <React.Fragment>
                <OrbitControls enableZoom={false} 
                               enableDamping 
                               maxPolarAngle={2}
                               
                               />
                <ambientLight intensity={3}/>
                <Head/> 
            </React.Fragment>
        </Canvas>
    );
};
