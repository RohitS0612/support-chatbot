'use client'
import { AnimatePresence, motion } from "framer-motion"
import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import features from "@/config/features.json";

const HomeClient = ({ email }: { email?: string }) => {
    const [open, setOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleLogin = () => {
        window.location.href = "/api/auth/login";
    }

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            if (response.ok) {
                toast.success('Logged out successfully!');
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error('Logout failed');
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#4ade80',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-x1 border-b to-zinc-50 border-zinc-200"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-lg font-semibold tracking-tight">Support<span className="text-zinc-600">Chat</span></div>

                    {email ? <div className="relative" ref={popupRef}>
                        <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
                            onClick={() => setOpen(!open)}
                        >
                            {email ? email[0].toUpperCase() : ""}
                        </button>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                                >
                                    <button className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100">Dashboard</button>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-zinc-100">Logout</button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div>

                        </motion.div>
                    </div> : <motion.button className="
                    px-5 py-2 rounded-full bg-black text-white text-sm font-medium
                    hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2
                "
                        onClick={handleLogin}
                    >Login</motion.button>}

                </div>
            </motion.div>

            <section className="pt-36 pb-28 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Your AI-Powered Support Assistant</h1>
                        <p className="text-lg text-zinc-600 mb-8">Get instant answers to your questions with our intelligent chatbot. Available 24/7 to help you with any inquiries.</p>
                        <div className="flex gap-4">

                            {email ?
                                <button className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition">
                                    Got to Dashboard
                                </button> :
                                <button className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition"
                                    onClick={handleLogin}
                                >
                                    Get Started
                                </button>
                            }

                            <a href="#features" className="px-7 py-3 rounded-xl border border-zinc-700 text-zinc-700 font-medium hover:bg-zinc-100 transition">
                                Learn More
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                       <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
                        <div className="text-sm text-zinc-500 mb-3">AI-Powered Support</div>
                        <div className="space-y-3">
                            <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">What are your business hours?</div>
                            
                            <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm text-zinc-700 w-fit">10:00 AM - 6:00 PM (Monday - Friday)</div>
                        </div>
                        </div>
                        <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 3,  repeat: Infinity }}
                        className="
                            absolute -bottom-8 right-0
                            w-14 h-14 rounded-full
                            bg-black text-white
                            flex items-center justify-center shadow-xl
                        "
                        >
                            🗨️
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            

            {/* Features Section */}
            <section
            id="features" 
            className="bg-zinc-50 py-28 px-6 border-t border-zinc-200">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{once:false}}
                    className="text-3xl font-semibold text-center"
                    >
                        Why Bussiness Choose Us
                    </motion.h2>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: false }}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.05,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    transition: { duration: 0.3 } 
                                }}
                                className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-zinc-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* footer  */}
            <footer className="bg-zinc-900 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            SupportChat is an AI-powered support assistant that helps businesses provide instant, 
                            24/7 customer service. Our intelligent chatbot handles inquiries efficiently, 
                            reducing costs while improving customer satisfaction.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><a href="#" className="hover:text-white transition">Home</a></li>
                            <li><a href="#features" className="hover:text-white transition">Features</a></li>
                            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-800 text-center">
                    <p className="text-zinc-500 text-sm">
                        &copy; {new Date().getFullYear()} SupportChat. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default HomeClient