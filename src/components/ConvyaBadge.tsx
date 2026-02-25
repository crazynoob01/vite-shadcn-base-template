import { motion } from 'framer-motion';

export const ConvyaBadge = () => {
    return (
        <motion.a
            href="https://convya.art"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Made with Convya"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 pl-2.5 pr-3.5 py-2 bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-800/85 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_2px_20px_-4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] hover:shadow-[0_4px_28px_-4px_rgba(99,102,241,0.25),0_0_0_1px_rgba(99,102,241,0.15)] hover:border-indigo-400/20 transition-all duration-500 ease-out group no-underline cursor-pointer"
        >
            {/* Gradient orb mark */}
            <div className="relative flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_8px_rgba(129,140,248,0.4)] group-hover:shadow-[0_0_14px_rgba(129,140,248,0.6)] transition-shadow duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="relative z-10"
                >
                    <path
                        d="M5 1L6.5 3.5L9 4.5L7 6.5L7.5 9L5 8L2.5 9L3 6.5L1 4.5L3.5 3.5L5 1Z"
                        fill="white"
                        fillOpacity="0.9"
                    />
                </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col leading-none gap-[1px]">
        <span className="text-[8px] uppercase tracking-[0.15em] font-medium text-white/40 group-hover:text-white/55 transition-colors duration-500">
          Built with
        </span>
                <span className="text-[11px] tracking-[0.04em] font-semibold text-white/85 group-hover:text-white transition-colors duration-500">
          Convya
        </span>
            </div>

            {/* Hover shimmer overlay */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
        </motion.a>
    );
};
