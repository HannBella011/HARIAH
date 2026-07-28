import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

const DEFAULT_IMAGES = [
  {
    src: 'https://i.pinimg.com/1200x/51/50/cb/5150cbc32cb5219ed370bd10726afbc7.jpg',
    alt: 'Abstract art'
  },
  {
    src: 'https://i.pinimg.com/1200x/28/90/61/2890615cf9d7b2452764fab57ac2f24b.jpg',
    alt: 'Modern sculpture'
  },
  {
    src: 'https://i.pinimg.com/736x/9d/0f/0b/9d0f0b26e7646e071ee04e92723f1814.jpg',
    alt: 'Digital artwork'
  },
  {
    src: 'https://i.pinimg.com/736x/8a/62/5d/8a625dbe45903b1e9c37c2e50ac6cb9e.jpg',
    alt: 'Contemporary art'
  },
  {
    src: 'https://i.pinimg.com/1200x/1d/ac/40/1dac40b04b16bf6f8a3b5eaa938b3c51.jpg',
    alt: 'Geometric pattern'
  },
  {
    src: 'https://i.pinimg.com/736x/93/60/93/936093269d0df526a86c02cfffffd806.jpg',
    alt: 'Textured surface'
  },
  { src: 'https://i.pinimg.com/736x/66/7e/7e/667e7e1e23fe53ec6f273e8d879d3aaf.jpg', alt: 'Social media image' },
  {
    src: 'https://i.pinimg.com/736x/bb/83/a3/bb83a3c2dcd19791d4c51316152e057e.jpg',
    alt: 'Artistic composition'
  },
  {
    src: 'https://i.pinimg.com/736x/47/35/d0/4735d009e8022337f0f3d82164eaed95.jpg',
    alt: 'Colorful abstract'
  },
  {
    src: 'https://i.pinimg.com/736x/27/06/94/2706947f7af6c234a6a46dd61855fc2e.jpg',
    alt: 'Modern art piece'
  },
  {
    src: 'https://i.pinimg.com/1200x/39/43/4b/39434b49faadf6846e84d268960de454.jpg',
    alt: 'Creative design'
  },
  {
    src: 'https://i.pinimg.com/736x/e5/aa/17/e5aa178c3038a1a2837fc0a577f6d4f5.jpg',
    alt: 'Artistic expression'
  },
  {
    src: 'https://i.pinimg.com/1200x/58/cd/d5/58cdd5afd1a0b7ec0f4b35662556af9d.jpg',
    alt: 'Neon art'
  },
  {
    src: 'https://i.pinimg.com/736x/5e/d2/81/5ed281f9e8fac1f1f59d57112e58b9a7.jpg',
    alt: 'done'
  },
  {
    src: 'https://i.pinimg.com/736x/3c/3e/74/3c3e74dc0bb096b283786da2d3faab98.jpg',
    alt: 'Digital creation'
  },
  {
    src: 'https://i.pinimg.com/736x/d1/f7/ee/d1f7ee12e3adfaa00309e29e34ee201d.jpg',
    alt: 'Artistic vision'
  },
  {
    src: 'https://i.pinimg.com/1200x/5b/99/09/5b99095e55612bae5e518945dd8e0b91.jpg',
    alt: 'Creative work'
  },
  {
    src: 'https://i.pinimg.com/1200x/27/be/95/27be958d411f6bb2b3ba32e5e8597be8.jpg',
    alt: 'Modern masterpiece'
  },
  {
    src: 'https://i.pinimg.com/736x/07/98/1f/07981fa4af86ff3531ae8c12c5f3a0e3.jpg',
    alt: 'Artistic flow'
  },
  {
    src: 'https://i.pinimg.com/736x/3e/3a/7e/3e3a7e03e10c3753dd9609bce411a548.jpg',
    alt: 'Abstract beauty'
  },
  {
    src: 'https://i.pinimg.com/736x/fc/d3/d9/fcd3d980248989f2e0041bd6292dceb1.jpg',
    alt: 'Visual art'
  },
  {
    src: 'https://i.pinimg.com/736x/14/66/20/146620e16f0a6e990b8be8da329c5c21.jpg',
    alt: 'Artistic pattern'
  },
  {
    src: 'https://i.pinimg.com/736x/9e/8f/ac/9e8fac19d5f13266a1b951befc956104.jpg',
    alt: 'Landscape art'
  },
  {
    src: 'https://i.pinimg.com/736x/0a/22/7b/0a227b6eb2182427a5d949d1be896bdf.jpg',
    alt: 'Pastel creation'
  },
  {
    src: 'https://i.pinimg.com/1200x/26/a8/e7/26a8e7923ef545b8ef05960639ccc902.jpg',
    alt: 'Digital abstract'
  },
  {
    src: 'https://i.pinimg.com/736x/66/e2/99/66e2997ff2ad24772dc74d0215a8865e.jpg',
    alt: 'Colorful design'
  }
];

// Export DEFAULT_IMAGES so other components can use it
export { DEFAULT_IMAGES };

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el, name, fallback) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.` 
    );
  }

  const normalizedImages = pool
    .map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '', isNew: false };
    }
    return {
      ...image,
      src: image.src || '',
      alt: image.alt || '',
      isNew: image.isNew || false
    };
  })
    .filter(image => image.src);

  const seen = new Set();
  const uniqueImages = normalizedImages.filter(image => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });

  const repeatableImages = uniqueImages.filter(image => !image.aria);
  const fillerImages = repeatableImages.length > 0 ? repeatableImages : uniqueImages;

  return coords.map((c, i) => ({
    ...c,
    ...(uniqueImages[i] || fillerImages[(i - uniqueImages.length) % fillerImages.length] || { src: '', alt: '' })
  }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#120F17',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '250px',
  openedImageHeight = '350px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true,
  selectedAria = null,
  notice = '',
  onImageClick = null,
  onOpenComplete = null
}) {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const sphereRef = useRef(null);
  const frameRef = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef = useRef(null);
  const focusedElRef = useRef(null);
  const openedAriaRef = useRef(null);
  const originalTilePositionRef = useRef(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg, yDeg) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge');
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement('div');
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  // Auto-rotate animation - slow and continuous
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();
    
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Slow rotation speed (adjust as needed)
      const rotationSpeed = 0.005; // Very slow rotation
      
      // Update rotation
      rotationRef.current.y = (rotationRef.current.y + rotationSpeed * deltaTime) % 360;
      
      applyTransform(rotationRef.current.x, rotationRef.current.y);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx, vy) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const evt = event;
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        const evt = event;
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          let [vMagX, vMagY] = velocity;
          const [dirX, dirY] = direction;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      }
    },
    { target: mainRef, eventOptions: { passive: true } }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement;
      const overlay = viewerRef.current?.querySelector('.enlarge');
      if (!overlay) return;
      const refDiv = parent.querySelector('.item__image--reference');
      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        const messagePanel = viewerRef.current?.querySelector('.aria-message-panel');
        const songFrame = viewerRef.current?.querySelector('.aria-song-frame');
        const noticePanel = viewerRef.current?.querySelector('.aria-success-notice');
        if (messagePanel) messagePanel.remove();
        if (songFrame) songFrame.remove();
        if (noticePanel) noticePanel.remove();
        openedAriaRef.current = null;
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');
        el.style.visibility = '';
        el.style.zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute('data-enlarging');
        openingRef.current = false;
        unlockScroll();
        return;
      }
      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current.getBoundingClientRect();
      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height
      };
      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height
      };
      const animatingOverlay = document.createElement('div');
      animatingOverlay.className = 'enlarge-closing';
      animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
      const originalImg = overlay.querySelector('img');
      if (originalImg) {
        const img = originalImg.cloneNode();
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        animatingOverlay.appendChild(img);
      }
      overlay.remove();
      const messagePanel = viewerRef.current?.querySelector('.aria-message-panel');
      const songFrame = viewerRef.current?.querySelector('.aria-song-frame');
      const noticePanel = viewerRef.current?.querySelector('.aria-success-notice');
      if (messagePanel) messagePanel.remove();
      if (songFrame) songFrame.remove();
      if (noticePanel) noticePanel.remove();
      openedAriaRef.current = null;
      rootRef.current.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();
      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
        animatingOverlay.style.opacity = '0';
      });
      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.transition = 'none';
        el.style.transition = 'none';
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');
        requestAnimationFrame(() => {
          el.style.visibility = '';
          el.style.opacity = '0';
          el.style.zIndex = 0;
          focusedElRef.current = null;
          rootRef.current?.removeAttribute('data-enlarging');
          requestAnimationFrame(() => {
            parent.style.transition = '';
            el.style.transition = 'opacity 300ms ease-out';
            requestAnimationFrame(() => {
              el.style.opacity = '1';
              setTimeout(() => {
                el.style.transition = '';
                el.style.opacity = '';
                openingRef.current = false;
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true')
                  document.body.classList.remove('dg-scroll-lock');
              }, 300);
            });
          });
        });
      };
      animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
    };
    scrim.addEventListener('click', close);
    const onKey = e => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  const getSongEmbed = useCallback(songLink => {
    if (!songLink) return null;
    try {
      const url = new URL(songLink);
      if (url.hostname.includes('spotify.com')) {
        const parts = url.pathname.split('/').filter(Boolean);
        const type = parts[0] || 'track';
        const id = parts[1];
        return id ? { url: `https://open.spotify.com/embed/${type}/${id}`, type: 'spotify' } : null;
      }
      if (url.hostname.includes('youtube.com')) {
        const videoId = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop();
        return videoId
          ? { url: `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`, type: 'youtube' }
          : null;
      }
      if (url.hostname.includes('youtu.be')) {
        const videoId = url.pathname.split('/').filter(Boolean)[0];
        return videoId
          ? { url: `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`, type: 'youtube' }
          : null;
      }
    } catch {
      return null;
    }
    return null;
  }, []);

  const getSongLink = useCallback(aria => {
    return aria.songLink || aria.songURL || '';
  }, []);

  const showAriaDetails = useCallback(
    aria => {
      const viewer = viewerRef.current;
      if (!viewer || !aria) return;

      viewer.querySelector('.aria-message-panel')?.remove();
      viewer.querySelector('.aria-song-frame')?.remove();
      viewer.querySelector('.aria-success-notice')?.remove();

      const successText = aria.notice || notice;
      if (successText) {
        const noticeEl = document.createElement('div');
        noticeEl.className = 'aria-success-notice';
        noticeEl.textContent = successText;
        viewer.appendChild(noticeEl);
      }

      const panel = document.createElement('aside');
      const messageLength = (aria.message || '').length;
      panel.className = `aria-message-panel${messageLength > 140 ? ' aria-message-panel--long' : ''}${messageLength > 260 ? ' aria-message-panel--extra-long' : ''}`;
      const message = document.createElement('p');
      message.className = 'aria-message-text';
      panel.appendChild(message);
      viewer.appendChild(panel);

      let index = 0;
      const fullMessage = aria.message || '';
      const typeNext = () => {
        if (!panel.isConnected) return;
        message.textContent = fullMessage.slice(0, index);
        index += 1;
        if (index <= fullMessage.length) {
          window.setTimeout(typeNext, 45);
        }
      };
      window.setTimeout(typeNext, 160);

      const songLink = getSongLink(aria);
      const embed = getSongEmbed(songLink);
      if (embed) {
        const iframe = document.createElement('iframe');
        iframe.className = `aria-song-frame aria-song-frame--${embed.type}`;
        iframe.src = embed.url;
        iframe.title = 'Aria song player';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; border: none;';
        viewer.appendChild(iframe);
        
        // Try to trigger playback after a short delay to handle autoplay restrictions
        setTimeout(() => {
          try {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          } catch (e) {
            console.log('Autoplay may require user interaction');
          }
        }, 500);
      } else if (songLink) {
        window.open(songLink, '_blank', 'noopener,noreferrer');
      }
    },
    [getSongEmbed, getSongLink, notice]
  );

  const openItemFromElement = useCallback(
    (el, ariaOverride = null) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();
      const parent = el.parentElement;
      focusedElRef.current = el;
      el.setAttribute('data-focused', 'true');
      const offsetX = getDataNumber(parent, 'offsetX', 0);
      const offsetY = getDataNumber(parent, 'offsetY', 0);
      const sizeX = getDataNumber(parent, 'sizeX', 2);
      const sizeY = getDataNumber(parent, 'sizeY', 2);
      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
      const parentY = normalizeAngle(parentRot.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRot.rotateX - rotationRef.current.x;
      parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
      parent.style.setProperty('--rot-x-delta', `${rotX}deg`);
      const refDiv = document.createElement('div');
      refDiv.className = 'item__image item__image--reference';
      refDiv.style.opacity = '0';
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);

      void refDiv.offsetHeight;

      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();

      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        parent.removeChild(refDiv);
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
      el.style.visibility = 'hidden';
      el.style.zIndex = 0;
      const overlay = document.createElement('div');
      overlay.className = 'enlarge';
      overlay.style.position = 'absolute';
      overlay.style.left = frameR.left - mainR.left + 'px';
      overlay.style.top = frameR.top - mainR.top + 'px';
      overlay.style.width = frameR.width + 'px';
      overlay.style.height = frameR.height + 'px';
      overlay.style.opacity = '0';
      overlay.style.zIndex = '30';
      overlay.style.willChange = 'transform, opacity';
      overlay.style.transformOrigin = 'top left';
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
      const ariaForTile = ariaOverride || items.find(item => item.src === rawSrc && item.aria)?.aria || null;
      openedAriaRef.current = ariaForTile;
      const img = document.createElement('img');
      img.src = rawSrc;
      overlay.appendChild(img);
      viewerRef.current.appendChild(overlay);
      const tx0 = tileR.left - frameR.left;
      const ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width;
      const sy0 = tileR.height / frameR.height;

      const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
      const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = '1';
        overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
        rootRef.current?.setAttribute('data-enlarging', 'true');
        if (openedAriaRef.current) {
          showAriaDetails(openedAriaRef.current);
        }
        if (onOpenComplete) {
          onOpenComplete();
        }
      }, 16);

      const wantsResize = openedImageWidth || openedImageHeight;
      if (wantsResize) {
        const onFirstEnd = ev => {
          if (ev.propertyName !== 'transform') return;
          overlay.removeEventListener('transitionend', onFirstEnd);
          const prevTransition = overlay.style.transition;
          overlay.style.transition = 'none';
          const tempWidth = openedImageWidth || `${frameR.width}px`;
          const tempHeight = openedImageHeight || `${frameR.height}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
          const newRect = overlay.getBoundingClientRect();
          overlay.style.width = frameR.width + 'px';
          overlay.style.height = frameR.height + 'px';
          void overlay.offsetWidth;
          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
          const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
          requestAnimationFrame(() => {
            overlay.style.left = `${centeredLeft}px`;
            overlay.style.top = `${centeredTop}px`;
            overlay.style.width = tempWidth;
            overlay.style.height = tempHeight;
          });
          const cleanupSecond = () => {
            overlay.removeEventListener('transitionend', cleanupSecond);
            overlay.style.transition = prevTransition;
          };
          overlay.addEventListener('transitionend', cleanupSecond, { once: true });
        };
        overlay.addEventListener('transitionend', onFirstEnd);
      }
    },
    [enlargeTransitionMs, items, lockScroll, onOpenComplete, openedImageHeight, openedImageWidth, segments, showAriaDetails, unlockScroll]
  );

  const onTileClick = useCallback(
    e => {
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      
      // Call custom handler if provided (e.g., to trigger message display)
      const imageData = e.currentTarget.parentElement.dataset;
      const item = items.find(entry => entry.src === imageData.src);
      if (onImageClick) {
        onImageClick({
          src: imageData.src,
          offsetX: imageData.offsetX,
          offsetY: imageData.offsetY,
          aria: item?.aria || null
        });
      }

      openItemFromElement(e.currentTarget, item?.aria || null);
    },
    [items, openItemFromElement, onImageClick]
  );

  const onTilePointerUp = useCallback(
    e => {
      if (e.pointerType !== 'touch') return;
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      const imageData = e.currentTarget.parentElement.dataset;
      const item = items.find(entry => entry.src === imageData.src);
      openItemFromElement(e.currentTarget, item?.aria || null);
    },
    [items, openItemFromElement]
  );

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock');
    };
  }, []);

  useEffect(() => {
    if (!selectedAria?.picture || !rootRef.current) return;
    const openSelected = () => {
      const matchingItem = Array.from(rootRef.current.querySelectorAll('.item')).find(
        item => item.dataset.src === selectedAria.picture
      );
      const imageEl = matchingItem?.querySelector('.item__image');
      if (imageEl) {
        openItemFromElement(imageEl, selectedAria);
      }
    };
    const timer = window.setTimeout(openSelected, 80);
    return () => window.clearTimeout(timer);
  }, [openItemFromElement, selectedAria]);

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x']: segments,
        ['--segments-y']: segments,
        ['--overlay-blur-color']: overlayBlurColor,
        ['--tile-radius']: imageBorderRadius,
        ['--enlarge-radius']: openedImageBorderRadius,
        ['--image-filter']: grayscale ? 'grayscale(1)' : 'none'
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  ['--offset-x']: it.x,
                  ['--offset-y']: it.y,
                  ['--item-size-x']: it.sizeX,
                  ['--item-size-y']: it.sizeY
                }}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={onTileClick}
                  onPointerUp={onTilePointerUp}
                >
                  <img 
                    src={it.src} 
                    draggable={false} 
                    alt={it.alt} 
                    className={it.isNew ? 'new-image' : ''}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}
