"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Advanced, clean, bright 3D background using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a subtle geometric mesh
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.5,
      transparent: true,
      opacity: 0.8,
      wireframe: true,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.2
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Soft, bright lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x3b82f6, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.x = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden selection:bg-blue-500/20">
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="text-xl font-medium tracking-tight text-slate-800">Face<span className="font-bold text-blue-600">Flow</span></div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Sign In
          </Link>
          <Link href="/enroll" className="px-5 py-2 text-sm font-medium bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm">
            Self-Enrollment
          </Link>
        </div>
      </nav>

      <div ref={containerRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Enterprise Grade Version 9.8
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight text-slate-900">
            Intelligent Presence <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Automation</span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A frictionless, privacy-first identity ecosystem. FaceFlow uses zero-trust architecture and localized biometrics to transform campus and corporate attendance.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <label className="flex items-start gap-3 cursor-pointer text-left max-w-lg mx-auto bg-white/50 p-4 rounded-xl border border-slate-200 hover:bg-white transition-colors">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                I agree to the <span className="font-semibold text-slate-900">FaceFlow Enterprise Agreement</span>, including the processing of biometric data in accordance with the Zero-Trust Privacy Policy.
              </span>
            </label>
            
            <Link 
              href={agreed ? "/login" : "#"} 
              className={`group flex items-center justify-center gap-2 px-10 py-4 rounded-full font-medium transition-all shadow-md ${agreed ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg" : "bg-slate-300 text-slate-500 cursor-not-allowed opacity-70"}`}
              onClick={(e) => {
                if (!agreed) e.preventDefault();
              }}
            >
              Continue to Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto w-full text-left"
        >
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, title: "Zero Trust Privacy", desc: "Mathematical embeddings with AES-256 Vault isolation." },
            { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Explainable AI", desc: "Temporal anti-spoofing and GAN artifact detection." },
            { icon: <Users className="w-6 h-6 text-blue-500" />, title: "Enterprise Scalability", desc: "Multi-tenant architecture serving global institutions." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
