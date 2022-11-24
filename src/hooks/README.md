# HTMLAudioElement

## properties

```typescript
interface HTMLMediaElement extends HTMLElement {
    /** 是否自动播放 */
    autoplay: boolean;
    /** 获取缓存进度：https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges#creating_our_own_buffering_feedback */
    readonly buffered: TimeRanges;
    /** 是否显示 audio */
    controls: boolean;
    /** 是否携带跨域请求头参数 */
    crossOrigin: 'anonymous' | 'use-credentials' | null;
    /** Gets the address or URL of the current media resource that is selected by IHTMLMediaElement. */
    readonly currentSrc: string;
    /** 获取或设置当前播放位置（秒） */
    currentTime: number;
    defaultMuted: boolean;
    /** Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource. */
    defaultPlaybackRate: number;
    disableRemotePlayback: boolean;
    /** 歌曲时长（秒） */
    readonly duration: number;
    /** 是否播放完 */
    readonly ended: boolean;
    /** Returns an object representing the current error state of the audio or video element. */
    readonly error: MediaError | null;
    /** 是否单曲循环 */
    loop: boolean;
    /** Available only in secure contexts. */
    readonly mediaKeys: MediaKeys | null;
    /** 静音 */
    muted: boolean;
    /** 当前网络状态 */
    readonly networkState: number;
    onencrypted: ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null;
    onwaitingforkey: ((this: HTMLMediaElement, ev: Event) => any) | null;
    /** 是否暂停 */
    readonly paused: boolean;
    /** 播放速率（0.5~4.0） */
    playbackRate: number;
    /** Gets TimeRanges for the current media resource that has been played. */
    readonly played: TimeRanges;
    /** Gets or sets a value indicating what data should be preloaded, if any. */
    preload: "none" | "metadata" | "auto" | "";
    preservesPitch: boolean;
    readonly readyState: number;
    readonly remote: RemotePlayback;
    /** Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked. */
    readonly seekable: TimeRanges;
    /** Gets a flag that indicates whether the client is currently moving to a new playback position in the media resource. */
    readonly seeking: boolean;
    /** The address or URL of the a media resource that is to be considered. */
    src: string;
    srcObject: MediaProvider | null;
    readonly textTracks: TextTrackList;
    /** 音量（0.01~1） */
    volume: number;
    addTextTrack(kind: TextTrackKind, label?: string, language?: string): TextTrack;
    /** 是否支持播放指定格式 */
    canPlayType(type: string): "" | "maybe" | "probably";
    /** 调整播放时间，参数为双精度小数，单位秒；目前兼容性比较差，大部分浏览不支持 */
    fastSeek(time: number): void;
    /** 重置当前播放状态 */
    load(): void;
    /** 暂停 */
    pause(): void;
    /** 播放 */
    play(): Promise<void>;
    /** Available only in secure contexts. */
    setMediaKeys(mediaKeys: MediaKeys | null): Promise<void>;
    /** 数据可用于当前播放位置，如果是视频的话，表示不足以实际播放超过一帧，也就是没法继续播放 - 2 */
    readonly HAVE_CURRENT_DATA: number;
    /** 当前播放位置的数据以及未来至少一小段时间的数据可用 - 4 */
    readonly HAVE_ENOUGH_DATA: number;
    /** metadata 加载完 - 3 */
    readonly HAVE_FUTURE_DATA: number;
    /** metadata 加载完 - 1 */
    readonly HAVE_METADATA: number;
    /** 没有加载到信息 - 0 */
    readonly HAVE_NOTHING: number;
    /** 没有加载到信息 - 0 */
    readonly NETWORK_EMPTY: number;
    /** 还没开始网络请求 - 1 */
    readonly NETWORK_IDLE: number;
    /** 正在下载资源 - 2 */
    readonly NETWORK_LOADING: number;
    /** 无法获取资源 - 3 */
    readonly NETWORK_NO_SOURCE: number;
    addEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLMediaElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

interface TimeRanges {
    /** Returns the number of ranges in the object. */
    readonly length: number;
    /**
     * Returns the time for the end of the range with the given index.
     *
     * Throws an "IndexSizeError" DOMException if the index is out of range.
     */
    end(index: number): number;
    /**
     * Returns the time for the start of the range with the given index.
     *
     * Throws an "IndexSizeError" DOMException if the index is out of range.
     */
    start(index: number): number;
}
```
## methods

- `canplay`：可以开始播放，但是并没有完全下载资源
- `ended`：播放完触发
- `error`：播放出错触发
- `loadedmetadata`：音频信息加载完触发
- `pause`：暂停时触发，调用`pause()`方法或者将`paused`属性设置成`true`时触发
- `canplay`：可以开始播放音频
- `play`：调用`play()`方法或者将`paused`属性设置成`false`时触发
- `canplaythrough`：可以播放完音频，数据已经完全缓存
- `playing`：开始播放时触发
- `progress`：加载资源文件时定期触发，可用于配合`buffered`属性获取缓存进度
- `suspend`：当加载资源阻塞时触发
- `waiting`：当缺少缓存数据无法继续播放时触发
- `stalled`：尝试加载资源出错
- `timeupdate`：播放时触发，更新当前播放时间
- `volumechange`：调整音量时触发
- `seeking`：开始调整播放进度时触发
- `seeked`：调整播放进度完后触发