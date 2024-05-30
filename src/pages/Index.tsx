import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { css } from "../../styled-system/css";
import { useNavigate } from "@tanstack/react-router";

export const IndexPage = () => {
  const navigate = useNavigate();
  const handleUpload = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await fetch(`${window.location.origin}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!result.ok) {
          alert("アップロードに失敗しました");
          return;
        }

        const { filename } = await result.json();

        navigate({
          to: "/progress",
          search: {
            filename,
          },
        });
      }
    },
    [navigate]
  );

  const handleYtDlp = useCallback(async () => {
    const url = prompt("YouTubeのURLを入力してください");

    if (!url) {
      return;
    }

    const result = await fetch(`${window.location.origin}/yt-dlp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });

    if (!result.ok) {
      alert("ダウンロードに失敗しました");
      return;
    }

    const { filename } = await result.json();

    navigate({
      to: "/progress",
      search: {
        filename,
      },
    });
  }, [navigate]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
  });

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      })}
    >
      <h1 className={css({ fontSize: "4xl" })}>Media Knife</h1>
      <p className={css({ fontSize: "xl" })}>
        加工したメディアファイルをアップロードしてください。
      </p>
      <div></div>

      <div
        {...getRootProps()}
        className={css({
          borderWidth: 2,
          borderRadius: "lg",
          width: 48,
          height: 48,
          padding: 12,
        })}
      >
        <input {...getInputProps()} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // class="icon icon-tabler icon-tabler-upload"
          className={css({
            stroke: "#2c3e50",
          })}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 9l5 -5l5 5" />
          <path d="M12 4l0 12" />
        </svg>
      </div>
      <button
        onClick={handleYtDlp}
        className={css({
          fontSize: "2xl",
          bg: "indigo.800",
          borderRadius: "lg",
          padding: 4,
          borderWidth: 2,
          color: "white",
        })}
      >
        YouTubeからダウンロードする場合はこちら
      </button>
    </div>
  );
};
