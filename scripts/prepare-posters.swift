import Foundation
import AVFoundation
import AppKit

let root = URL(fileURLWithPath: CommandLine.arguments[1])
let fm = FileManager.default
let files = fm.enumerator(at: root.appendingPathComponent("assets/videos"), includingPropertiesForKeys: nil)!
for case let url as URL in files where url.pathExtension == "mp4" {
    let asset = AVURLAsset(url: url)
    let generator = AVAssetImageGenerator(asset: asset)
    generator.appliesPreferredTrackTransform = true
    generator.maximumSize = CGSize(width: 960, height: 640)
    let duration = CMTimeGetSeconds(asset.duration)
    do {
        let cg = try generator.copyCGImage(at: CMTime(seconds: min(1, duration / 4), preferredTimescale: 600), actualTime: nil)
        let bitmap = NSBitmapImageRep(cgImage: cg)
        let output = url.deletingPathExtension().appendingPathExtension("jpg")
        try bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.82])!.write(to: output)
        print("\(url.lastPathComponent): \(String(format: "%.1f", duration))s")
    } catch { fatalError("Cannot extract poster for \(url.path): \(error)") }
}
