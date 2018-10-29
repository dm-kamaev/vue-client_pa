<template>
  <div class="map" id="mymap" ref="map" :style="{width: width, height: height}"></div>
</template>

<script>
  import { getGeoObject } from '@/components/common/AddressHint/apiYandex'

  export default {
    name: 'YandexMap',

    props: {
      center: {
        type: Array,
        required: true
      },

      geoObject: {
        type: Object
      },

      height: {
        type: String
      },

      width: {
        type: String
      }
    },

    data: () => ({
      map: null,
      apiSrc: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
      centerMap: null
    }),

    computed: {
      mobile() {
        return this.$store.state.common.isMobile
      }
    },

    methods: {
      async initMap(src, options) {
        const init  = () => {
          if (typeof ymaps.Map === 'function') {
            this.map = new ymaps.Map(src, options)

            if (!this.mobile) {
              this.map.events.add('click', (e) => {
                if (!this.map.balloon.isOpen()) {
                  const coords = e.get('coords')
                  this.getGeoObject(coords)
                  this.map.geoObjects.removeAll().add(new ymaps.Placemark(coords))
                }
              })
            }

            if (this.mobile) {
              this.map.events.add("boundschange", (e) => {
                this.lastCall(this.getGeoObject(e.get("newCenter")))
              })
            }
          }
        }

        if ('ymaps' in window) {
          init()
        } else {
          this.loadApi(init)
        }
      },

      async getGeoObject(pos) {
        const data = await getGeoObject({
          city: this.activeCity,
          results: 1,
          coordinate: `${pos[1]} ${pos[0]}`
        })

        data[0].GeoObject.Point.pos = `${pos[1]} ${pos[0]}`

        this.$emit('setPoint', data[0].GeoObject)
      },

      updateMap() {
        if (this.map) {
          if (!this.mobile) {
            this.map.geoObjects.removeAll().add(new ymaps.Placemark(this.center))
            this.map.setZoom(17)
          }

          this.map.setCenter(this.center)
        }
      },

      lastCall(func) {
        const self = this

        function wrapper(...args) {
          if(func.lastCallWrapper === wrapper) {
            func.call(self, ...args)
          }
        }

        func.lastCallWrapper = wrapper

        return wrapper
      },

      loadApi(callback) {
        let script = document.createElement('script');
        script.src = this.apiSrc;
        script.type = 'text/javascript';
        script.onload = context => window.ymaps.ready(callback, context);
        document.body.appendChild(script);
      }
    },

    watch: {
      center() {
        this.updateMap()
      }
    },

    mounted() {
      const options = {
        zoom: 17,
        center: this.center,
        controls: []
      }

      if (!this.mobile) {
        options.controls = ['zoomControl', 'fullscreenControl']
      }

      this.initMap('mymap', options);

      if (Object.keys(this.geoObject).length) {
        this.updateMap()
      }
    }
  }
</script>

<style scoped>

</style>
