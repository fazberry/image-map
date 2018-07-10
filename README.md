# image-map
## Scalable image map

This is a scalalbe image map that I have created using Googlemaps API. I have used of a piece of artwork created for my band Dead Cannons.

### Image generator script

#### Zoom level 0
```
convert original.jpg -geometry 256x 0.jpg
convert 0.jpg -crop 256x256 -extent 256x256 +gravity -set filename:tile ./tiles/tile_0-%[fx:page.x/256]-%[fx:page.y/256] %[filename:tile].jpg
```

```
<zoom> example
convert original.jpg -geometry 512x <zoom>.jpg
convert <zoom>.jpg -crop 256x256 -extent 256x256 +gravity -set filename:tile ./tiles/tile_<zoom>-%[fx:page.x/256]-%[fx:page.y/256] %[filename:tile].jpg
```


#### Repeat for 5 zoom levels
##### Optimize filesize
```
mogrify -quality "90%" -interlace Plane -strip *.jpg
```


