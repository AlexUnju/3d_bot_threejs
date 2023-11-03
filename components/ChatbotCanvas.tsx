"use client";
import { AppContext } from '@/app/context/IsPlayingContext';
import { OrbitControls, SpotLight, useAnimations, useDepthBuffer, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three';

const Torch = ({vec = new Vector3(), ...props}) => {
    const light = useRef<THREE.SpotLight>(null);
    const viewport = useThree(state => state.viewport)
    useFrame((state) => {
        light.current?.target.position.lerp(
            vec.set((state.mouse.x * viewport.width) / 2, 
                   (state.mouse.y * viewport.width) / 2,
                    0),
        0.1);
        light.current?.target.updateMatrixWorld();
    });

    return ( 
    <SpotLight ref={light}
    castShadow
    penumbra={1}
    distance={10}
    angle={0.35}
    attenuation={5}
    anglePower={4}
    intensity={3}
    {...props}
    />
    )
}

const Head = () => {
    const {isPlaying,setIsPlaying } = useContext(AppContext);
    const model = useGLTF('/cute_robot.glb')
    const animations = useAnimations(model.animations, model.scene)
    const action = animations.actions.Animation;
    const depthBuffer = useDepthBuffer({ frames: 1 });
    console.log(action);
    useEffect(() => {
        if(isPlaying){
            action?.play();
        }else {
            action?.fadeOut(0.5);
            setTimeout(() => {
                action?.stop();
            }, 500);
        }

    }, [isPlaying ,action]);
    return (
		<>
			<primitive object={model.scene} scale={1.7} position-y={-1.5}  rotation-y={-1.5} />
			<Torch
				depthBuffer={depthBuffer}
color="#00FFFF"
				position={[3, 2, 2]}
			/>
			<Torch
				depthBuffer={depthBuffer}
				color="yellow"
				position={[-3, 2, 2]}
			/>
		</>
	);
}

export const ChatbotCanvas = () => {
    return (
        <Canvas>
            <React.Fragment>

                <OrbitControls enableZoom={false} 
                               enableDamping 
                               maxPolarAngle={2}
                               minAzimuthAngle={-Math.PI * 0.5}
                               maxAzimuthAngle={Math.PI * 0.5}
                               />
               <ambientLight/>
                <Head/> 
            </React.Fragment>
        </Canvas>
    );
};
