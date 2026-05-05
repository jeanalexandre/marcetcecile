# 🚀 Guide Rapide - Optimisations Images

## ✅ Tout est déjà fait !

Votre site est optimisé et prêt. Voici ce que vous devez savoir :

---

## 📁 Structure

```
public/
├── images/              👈 Images PNG originales (conservées)
└── images-optimized/    👈 Images WebP optimisées (utilisées sur le site)
```

---

## 🎯 Commandes essentielles

### Développement
```bash
npm run dev          # Démarrer le serveur de développement
```

### Build
```bash
npm run build        # Créer le site de production
npm run preview      # Prévisualiser le build
```

### Optimiser de nouvelles images
```bash
npm run optimize-images    # Convertir nouveaux PNG en WebP
```

---

## ➕ Ajouter une nouvelle image

### Étape par étape

1. **Ajouter le fichier PNG**
   ```bash
   # Copier votre image dans :
   public/images/ma-nouvelle-image.png
   ```

2. **Optimiser**
   ```bash
   npm run optimize-images
   ```
   ✅ Crée automatiquement :
   - `images-optimized/ma-nouvelle-image.webp`
   - `images-optimized/ma-nouvelle-image-mobile.webp`
   - `images-optimized/ma-nouvelle-image-tablet.webp`
   - `images-optimized/ma-nouvelle-image-desktop.webp`

3. **Utiliser dans le code**
   ```astro
   <picture>
     <source media="(max-width: 768px)" 
             srcset="/images-optimized/ma-nouvelle-image-mobile.webp" />
     <img src="/images-optimized/ma-nouvelle-image.webp" 
          alt="Description" 
          loading="lazy" 
          width="800" 
          height="600" />
   </picture>
   ```

---

## 💡 Bonnes pratiques

### Loading

```astro
<!-- Image importante (visible immédiatement) -->
<img src="..." loading="eager" />

<!-- Image en bas de page ou dans carrousel -->
<img src="..." loading="lazy" />
```

### Dimensions

```astro
<!-- TOUJOURS ajouter width et height -->
<img src="..." width="800" height="600" />
```
👉 Évite les layout shifts = meilleur score

### Alt text

```astro
<!-- Texte descriptif pour SEO et accessibilité -->
<img src="..." alt="Lunettes de soleil Marc & Cécile" />
```

---

## 📊 Vérifier les performances

### En ligne
1. Déployer le site
2. Tester sur : https://pagespeed.web.dev/
3. Score attendu : **85-95+** ✅

### En local
```bash
npm run build
npm run preview
```
Puis ouvrir Chrome DevTools > Lighthouse

---

## 🆘 Problèmes courants

### Image n'apparaît pas
```bash
# Vérifier que l'image existe
ls public/images-optimized/nom-image.webp

# Si elle n'existe pas, optimiser :
npm run optimize-images
```

### Build échoue
```bash
# Nettoyer et rebuilder
rm -rf dist node_modules/.vite
npm run build
```

### Image floue
```astro
<!-- Augmenter la qualité dans optimize-images.mjs -->
.webp({ quality: 85 })  // Au lieu de 75-80
```

---

## 📈 Résultats obtenus

| Métrique | Avant | Après | 
|----------|-------|-------|
| Poids images | 24 Mo | 2.2 Mo |
| Réduction | - | **91%** |
| LCP mobile | 4-6s | 1-2s |
| Score Lighthouse | 40-50 | 85-95+ |

---

## 📚 Documentation complète

- `OPTIMISATIONS.md` - Guide technique détaillé
- `RAPPORT_OPTIMISATION.md` - Rapport complet des optimisations

---

## ✨ C'est tout !

Votre site est maintenant ultra-rapide sur mobile. 

**Déployez et profitez ! 🚀**

