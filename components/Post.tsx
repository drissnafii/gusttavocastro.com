import styled from 'styled-components'

export const PostMain = styled.main`
  padding: ${({ theme }) => theme.space.navHeightMobile} 0;
  overflow: hidden;
  flex: 1 1;

  @media ${({ theme }) => theme.media.bp2} {
    padding: ${({ theme }) => theme.space.navHeightDesktop} 0;
  }
`

export const Post = styled.main`
  overflow: hidden;
  flex: 1 1;
`

export const PostContainer = styled.div`
  margin: 0 auto;
  max-width: 760px;
  padding: 0 20px;
`

export const PostContent = styled.div`
  font-size: 16px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 20px 0;

  & .iframe-wrap {
    height: 0;
    margin-bottom: 20px;
    overflow: hidden;
    padding-bottom: 56.25%;
    padding-top: 30px;
    position: relative;
  }

  & .iframe-wrap iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  & .post-image-caption {
    color: ${({ theme }) => theme.colors.secondary};
    text-align: center;
    font-style: italic;
    font-size: 14px;
  }

  & .post-image-full {
    margin: 20px 0 0;
    max-width: initial;
    width: 70vw;

    @media ${({ theme }) => theme.media.bp2} {
      margin-left: calc(-1 * (70vw - 760px) / 2);
    }

    @media ${({ theme }) => theme.media.bp4} {
      margin-left: 0;
    }
  }

  & .side-by-side {
    display: flex;
    width: 90vw;
    margin: 40px 0;
    flex-direction: row;

    @media ${({ theme }) => theme.media.bp2} {
      margin-left: calc(-1 * (90vw - 760px) / 2);
    }

    @media ${({ theme }) => theme.media.bp4} {
      margin-left: 0;
      flex-direction: column;
    }
  }

  & .side-by-side-img {
    min-width: 50%;

    @media ${({ theme }) => theme.media.bp2} {
      min-width: 100%;
    }
  }

  & .side-by-side-caption {
    color: ${({ theme }) => theme.colors.secondary};
    text-align: center;
    font-style: italic;
    font-size: 14px;
    margin-top: -30px;
  }
`
