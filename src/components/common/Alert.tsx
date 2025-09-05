"use client";
import React, { useEffect, useState } from "react";

const Alert = () => {
	const [show, setShow] = useState(false);
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

	useEffect(() => {
		// Catch PWA install event
		const handleBeforeInstallPrompt = (e: any) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setShow(true); // Show the toast
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		};
	}, []);

	const handleAddToHomeScreen = async () => {
		if (deferredPrompt) {
			// If mobile supports install
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			console.log("User response:", outcome);
			setDeferredPrompt(null);
			setShow(false);
		} else {
			// Desktop fallback: suggest bookmarking
			alert(
				"To bookmark this page:\n\n- Press Ctrl + D (Windows/Linux)\n- Press Cmd + D (Mac)"
			);
			setShow(false);
		}
	};

	return show ? (
		<div
			className={`toast pwa-install-alert shadow bg-white ${show ? "show" : "hide"}`}
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			<div className="toast-body">
				<div className="content d-flex align-items-center mb-2">
					<img src="/assets/img/icons/icon-72x72.png" alt="" />
					<h6 className="mb-0">Add to Home Screen</h6>
					<button
						className="btn-close ms-auto"
						type="button"
						aria-label="Close"
						onClick={() => setShow(false)}
					></button>
				</div>
				<span className="mb-2 d-block">
					Click the <strong className="mx-1">Add to Home Screen</strong> button &
					enjoy it like a regular app.
				</span>
				<button className="btn btn-primary w-100" onClick={handleAddToHomeScreen}>
					Add to Home Screen
				</button>
			</div>
		</div>
	) : null;
};

export default Alert;
