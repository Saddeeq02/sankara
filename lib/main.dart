import 'package:flutter/material.dart';
import 'splash_screen.dart';

void main() {
  runApp(const SuhaimApp());
}

class SuhaimApp extends StatelessWidget {
  const SuhaimApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Suhaim Data App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const SplashScreen(),
    );
  }
}
