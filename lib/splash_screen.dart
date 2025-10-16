import 'dart:async';
import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'webview_page.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    // Navigate to WebView after 3 seconds
    Timer(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const SuhaimApp()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Heartbeat animation
            Pulse(
              infinite: true,
              duration: const Duration(seconds: 1),
              child: Column(
                children: [
                  Image.asset(
                    'assets/suhaim3.png', // 👈 put your logo in assets folder
                    width: 100,
                    height: 100,
                  ),
                  const SizedBox(height: 15),
                  const Text(
                    'WELCOME TO SUHAIM DATA APP',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      letterSpacing: 1.2,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
