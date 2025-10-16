import 'package:flutter/material.dart';
// ignore: unused_import
import 'package:suhaimapp3/main.dart';
import 'package:webview_flutter/webview_flutter.dart';

class SuhaimApp extends StatefulWidget {
  const SuhaimApp({super.key});

  @override
  State<SuhaimApp> createState() => _SuhaimAppState();
}

class _SuhaimAppState extends State<SuhaimApp> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse('https://suhaimnetwork.com.ng/mobile/login/'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: WebViewWidget(controller: _controller),
      ),
    );
  }
}
