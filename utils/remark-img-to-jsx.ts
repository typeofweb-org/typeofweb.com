// @ts-nocheck
/* eslint-disable -- ok */
import Fs from 'fs';

import SizeOf from 'image-size';
import { visit } from 'unist-util-visit';

const getSizeFor = (path: string, { width, height }: { width: number; height: number }) => {
  if (width && height) {
    return { width, height };
  }
  const dimensions = SizeOf(path);

  if (width) {
    return { width, height: Math.floor(dimensions.height * (width / dimensions.width)) };
  }
  if (height) {
    return { width: Math.floor(dimensions.width * (height / dimensions.height)), height };
  }

  return {
    width: dimensions.width,
    height: dimensions.height,
  };
};

export function imageToJsx(): import('unified').Transformer {
  return (tree) =>
    visit(
      tree,
      (node) => node && (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'img',
      (imageNode) => {
        const src = imageNode.attributes.find((a) => a.name === 'src');
        // only local files
        if (src?.value && Fs.existsSync(`${process.cwd()}${src.value}`)) {
          const width = imageNode.attributes.find((a) => a.name === 'width');
          const height = imageNode.attributes.find((a) => a.name === 'height');
          const dimensions = getSizeFor(`${process.cwd()}${src.value}`, { width: width?.value, height: height?.value });
          imageNode.attributes = imageNode.attributes
            .filter((a) => a.name !== 'width' && a.name !== 'height')
            .concat([
              { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
              { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
            ]);
        }

        imageNode.type = 'mdxJsxFlowElement';
        imageNode.name = 'Image';
        src.value = src.value.replace(/^\/public\//, '/');
      },
    );
}

export function remarkImgToJsx(): import('unified').Transformer {
  return (tree) => {
    visit(
      tree,
      (node) => {
        return node && node.type === 'paragraph' && node.children.some((n) => n.type === 'image');
      },
      (node) => {
        const imageNode = node.children.find((n) => n.type === 'image');

        // only local files
        if (Fs.existsSync(`${process.cwd()}${imageNode.url}`)) {
          const dimensions = getSizeFor(`${process.cwd()}${imageNode.url}`, {
            width: imageNode.width?.value,
            height: imageNode.height?.value,
          });

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

export function remarkHtmlImgToJsx(): import('unified').Transformer {
  return (tree) => {
    visit(
      tree,
      (node) => {
        return node && node.type === 'paragraph' && node.children.flat().some((n) => n.type === 'html');
      },
      (node) => {
        const htmlChildren = node.children.flat().filter((node) => node.type === 'html');

        // fix images
        htmlChildren.forEach((node) => {
          const srcMatch = (node.value as string).match(/src="([^"]*)"/);
          if (!srcMatch) {
            return;
          }
          const src = srcMatch[1];

          // only local files
          if (Fs.existsSync(`${process.cwd()}${src}`)) {
            const newSrc = src.replace(/^\/public\//, '/');
            node.value = node.value.replace(srcMatch[0], `src="${newSrc}"`);
          }
        });

        // fix links
        htmlChildren.forEach((node) => {
          const hrefMatch = (node.value as string).match(/href="([^"]*)"/);
          if (!hrefMatch) {
            return;
          }
          const src = hrefMatch[1];

          // only local files
          if (Fs.existsSync(`${process.cwd()}${src}`)) {
            const newSrc = src.replace(/^\/public\//, '/');
            node.value = node.value.replace(hrefMatch[0], `href="${newSrc}"`);
          }
        });
      },
    );
  };
}
