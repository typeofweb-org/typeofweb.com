// @ts-nocheck
/* eslint-disable -- ok */
import Fs from 'fs';

import SizeOf from 'image-size';
import { visit } from 'unist-util-visit';

export function imageToJsx(): import('unified').Transformer {
  return (tree) =>
    visit(
      tree,
      (node) => (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'img',
      (node) => {
        console.log(node);
        const src = node.attributes.find((a) => a.name === 'src');
        node.name = 'Image';
        src.value = src.value.replace(/^\/public\//, '/');
      },
    );
}

export function remarkImgToJsx(): import('unified').Transformer {
  return (tree) => {
    visit(
      tree,
      (node) => {
        return node.type === 'paragraph' && node.children.some((n) => n.type === 'image');
      },
      (node) => {
        const imageNode = node.children.find((n) => n.type === 'image');

        // only local files
        if (Fs.existsSync(`${process.cwd()}${imageNode.url}`)) {
          const dimensions =
            imageNode.width && imageNode.height
              ? {
                  width: imageNode.width,
                  height: imageNode.height,
                }
              : SizeOf(`${process.cwd()}${imageNode.url}`);

          // Convert original node to next/image
          imageNode.type = 'mdxJsxFlowElement';
          imageNode.name = 'Image';
          imageNode.url = imageNode.url.replace(/^\/public\//, '/');
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
          ];

          // Change node type from p to div to avoid nesting error
          node.type = 'div';
          node.children = [imageNode];
        }
      },
    );
  };
}
